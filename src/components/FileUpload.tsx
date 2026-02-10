'use client'

import { useState, useCallback } from 'react'
import { Upload, FileAudio, X, AlertCircle } from 'lucide-react'

interface AudioFile {
  id: string
  file: File
  name: string
  size: string
  status: 'pending' | 'analyzing' | 'complete' | 'error'
}

interface FileUploadProps {
  files: AudioFile[]
  setFiles: React.Dispatch<React.SetStateAction<AudioFile[]>>
  maxFiles?: number
  maxSizeMB?: number
}

export default function FileUpload({ files, setFiles, maxFiles = 5, maxSizeMB = 1024 }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const validateFiles = (newFiles: FileList | File[]): File[] => {
    const validFiles: File[] = []
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav']

    setError(null)

    for (const file of Array.from(newFiles)) {
      if (!allowedTypes.includes(file.type) && !file.name.match(/\.(mp3|wav)$/i)) {
        setError('Only MP3 and WAV files are accepted')
        continue
      }

      if (file.size > 200 * 1024 * 1024) {
        setError('Individual files must be under 200MB')
        continue
      }

      validFiles.push(file)
    }

    if (files.length + validFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return validFiles.slice(0, maxFiles - files.length)
    }

    const currentSize = files.reduce((acc, f) => acc + f.file.size, 0)
    const newSize = validFiles.reduce((acc, f) => acc + f.size, 0)
    if (currentSize + newSize > maxSizeMB * 1024 * 1024) {
      setError(`Total upload size cannot exceed ${maxSizeMB / 1024}GB`)
      return []
    }

    return validFiles
  }

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles = validateFiles(newFiles)

    const audioFiles: AudioFile[] = validFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      name: file.name,
      size: formatFileSize(file.size),
      status: 'pending' as const,
    }))

    setFiles((prev) => [...prev, ...audioFiles])
  }, [files, maxFiles, maxSizeMB, setFiles])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    setError(null)
  }

  return (
    <div className="w-full">
      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center
                   transition-all duration-300 cursor-pointer
                   ${dragActive
            ? 'border-tep-blue-500 bg-tep-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}
      >
        <input
          type="file"
          multiple
          accept=".mp3,.wav,audio/mpeg,audio/wav"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                        ${dragActive ? 'bg-tep-blue-100' : 'bg-gray-100'}`}>
            <Upload className={`w-8 h-8 ${dragActive ? 'text-tep-blue-600' : 'text-gray-600'}`} />
          </div>

          <p className="text-gray-900 text-lg font-medium mb-2">
            {dragActive ? 'Drop your audio files here' : 'Drag & drop your chapter files'}
          </p>
          <p className="text-gray-600 text-lg mb-4">
            or click to browse
          </p>
          <p className="text-gray-500 text-lg">
            MP3 or WAV • Up to {maxFiles} chapters • {maxSizeMB / 1024}GB total
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 text-lg">{error}</p>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-tep-blue-100 flex items-center justify-center flex-shrink-0">
                <FileAudio className="w-5 h-5 text-tep-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-medium truncate text-lg">{file.name}</p>
                <p className="text-gray-600 text-lg">{file.size}</p>
              </div>

              <button
                onClick={() => removeFile(file.id)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
