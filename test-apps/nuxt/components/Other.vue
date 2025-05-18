<script setup lang="ts">
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError
} from '@imagekit/vue'
import { ref } from 'vue'

const progress = ref(0)
const fileInput = ref<HTMLInputElement>()

const aborter = new AbortController()

async function authenticate() {
  const res = await fetch('http://localhost:3001/auth')
  if (!res.ok) throw new Error(await res.text())
  return (await res.json()) as {
    signature: string; expire: number; token: string; publicKey: string
  }
}

async function handleUpload() {
  const file = fileInput.value?.files?.[0]
  if (!file) return alert('Choose a file')

  let creds
  try { creds = await authenticate() } catch (e) {
    return console.error('Auth failed', e)
  }

  try {
    const resp = await upload({
      ...creds,
      file,
      fileName: file.name,
      onProgress: e => (progress.value = e.loaded / e.total * 100),
      abortSignal: aborter.signal
    })
    console.log('Upload OK', resp)
  } catch (err) {
    if (err instanceof ImageKitAbortError)        console.warn('Aborted')
    else if (err instanceof ImageKitInvalidRequestError) console.error('Bad request')
    else if (err instanceof ImageKitUploadNetworkError)  console.error('Network')
    else if (err instanceof ImageKitServerError)         console.error('Server side')
    else console.error(err)
  }
}
</script>

<template>
  <input type="file" ref="fileInput" />
  <button @click="handleUpload">Upload</button>
  <progress :value="progress" max="100" />
</template>