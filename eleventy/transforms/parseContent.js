/* ***** ----------------------------------------------- ***** **
/* ***** Parse Content Transform
/* ***** ----------------------------------------------- ***** */

const jsdom = require('jsdom')
const { JSDOM } = jsdom

module.exports = (content, outputPath) => {
  if (outputPath.endsWith('.html')) {
    const DOM = new JSDOM(content)
    const document = DOM.window.document

    // Add lazyload to all article images
    const articleImages = [...document.querySelectorAll('.rich-text img')]
    if (articleImages.length) {
      articleImages.forEach((image) => {
        // Set image src to data-src
        const imageSrc = image.getAttribute('src')
        image.setAttribute('data-src', imageSrc)
        image.removeAttribute('src')

        // Add lazyload class for lazysizes plugin
        image.classList.add('lazyload')
      })
    }

    // Wrap video player with container to make size responsive and add lazyload
    const articleVideos = [...document.querySelectorAll('.rich-text iframe')]
    if (articleVideos.length) {
      articleVideos.forEach((video) => {
        const videoSrc = video.getAttribute('src')
        if (videoSrc.includes('youtube') || videoSrc.includes('vimeo')) {
          // If YouTube, add lazyload attributes
          // Lazyloading with Vimeo will disable fullscreen so we don't include it here
          if (videoSrc.includes('youtube')) {
            // Set video src to data-src
            video.setAttribute('data-src', videoSrc)
            video.removeAttribute('src')

            // Add lazyload class for lazysizes plugin
            video.classList.add('lazyload')
          }

          // Add fullscreen attributes
          video.setAttribute('allowfullscreen', '')

          // Wrap video player with proportional container
          const embedWrapper = document.createElement('div')
          embedWrapper.classList =
            'aspect-w-16 aspect-h-9 my-30 sm:my-40'
          video.parentNode.insertBefore(embedWrapper, video)
          embedWrapper.appendChild(video)
        }
      })
    }

    return document.documentElement.outerHTML
  }
  return content
}
