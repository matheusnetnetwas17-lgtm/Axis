/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Serve modern formats and resize to the space each image actually occupies
    // (driven by the `sizes` prop on each <Image>). This is the single biggest
    // transfer-size win for the testimonial photos.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280],
    imageSizes: [64, 128, 256, 384],
  },
}

export default nextConfig
