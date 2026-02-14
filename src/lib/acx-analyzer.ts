import type { AcxSpec } from '@/types/acx'

export async function analyzeAudioFile(file: File): Promise<{ passed: boolean; specs: AcxSpec[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer

        const actualSampleRate = await getActualSampleRate(arrayBuffer, file.name)

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0))

        const channelData = audioBuffer.getChannelData(0)

        let maxSample = 0
        for (let i = 0; i < channelData.length; i++) {
          const abs = Math.abs(channelData[i])
          if (abs > maxSample) maxSample = abs
        }
        const peakDb = 20 * Math.log10(maxSample)
        const peakPassed = peakDb <= -3

        let sumSquares = 0
        for (let i = 0; i < channelData.length; i++) {
          sumSquares += channelData[i] * channelData[i]
        }
        const rms = Math.sqrt(sumSquares / channelData.length)
        const rmsDb = 20 * Math.log10(rms)
        const rmsPassed = rmsDb >= -23 && rmsDb <= -18

        const sortedSamples = Array.from(channelData)
          .map(Math.abs)
          .sort((a, b) => a - b)
        const quietSamples = sortedSamples.slice(0, Math.floor(sortedSamples.length * 0.1))
        const noiseRms = Math.sqrt(quietSamples.reduce((a, b) => a + b * b, 0) / quietSamples.length)
        const noiseFloorDb = noiseRms > 0 ? 20 * Math.log10(noiseRms) : -96
        const noiseFloorPassed = noiseFloorDb <= -60

        const sampleRatePassed = actualSampleRate === 44100

        const specs: AcxSpec[] = [
          {
            name: 'Peak Level',
            value: `${peakDb.toFixed(1)} dB`,
            requirement: '≤ -3 dB',
            passed: peakPassed,
            info: !peakPassed ? 'Reduce overall volume or use a limiter' : undefined,
          },
          {
            name: 'RMS Loudness',
            value: `${rmsDb.toFixed(1)} dB`,
            requirement: '-23 to -18 dB',
            passed: rmsPassed,
            info: !rmsPassed
              ? rmsDb < -23
                ? 'Audio is too quiet - increase volume'
                : 'Audio is too loud - reduce volume'
              : undefined,
          },
          {
            name: 'Noise Floor',
            value: `${noiseFloorDb.toFixed(1)} dB`,
            requirement: '≤ -60 dB',
            passed: noiseFloorPassed,
            info: !noiseFloorPassed ? 'Too much background noise - apply noise reduction' : undefined,
          },
          {
            name: 'Sample Rate',
            value: `${(actualSampleRate / 1000).toFixed(1)} kHz`,
            requirement: '44.1 kHz',
            passed: sampleRatePassed,
            info: !sampleRatePassed ? 'Resample to 44.1 kHz' : undefined,
          },
        ]

        const allPassed = specs.every((s) => s.passed)
        resolve({ passed: allPassed, specs })
      } catch (err) {
        reject(err)
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}

async function getActualSampleRate(arrayBuffer: ArrayBuffer, _filename: string): Promise<number> {
  const view = new DataView(arrayBuffer)

  if (view.getUint32(0, false) === 0x52494646 && view.getUint32(8, false) === 0x57415645) {
    return view.getUint32(24, true)
  }

  const maxSearch = Math.min(4096, arrayBuffer.byteLength)
  for (let i = 0; i < maxSearch - 3; i++) {
    if (view.getUint8(i) === 0xFF && (view.getUint8(i + 1) & 0xE0) === 0xE0) {
      const header = view.getUint32(i, false)
      const version = (header >> 19) & 0x03
      const sampleRateIndex = (header >> 10) & 0x03
      const sampleRates = [
        [44100, 48000, 32000],
        [22050, 24000, 16000],
        [11025, 12000, 8000],
      ]
      let versionIndex = 0
      if (version === 3) versionIndex = 0
      else if (version === 2) versionIndex = 1
      else if (version === 0) versionIndex = 2
      if (sampleRateIndex < 3) {
        return sampleRates[versionIndex][sampleRateIndex]
      }
    }
  }
  return 44100
}
