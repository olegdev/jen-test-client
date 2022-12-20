import { useState, useEffect } from 'react'
const { REACT_APP_API_URL } = process.env

function VideoFetcher({ renderId, onCancel }) {
  const [cancelClicked, setCancelClicked] = useState(false)
  const [renderState, setRenderState] = useState(null)

  // start fetching every x seconds
  useEffect(() => {
    async function requestRenderState() {
      const resp = await fetch(`${REACT_APP_API_URL}/renderVideo/${renderId}`)
      const data = await resp.json()
      setRenderState(data)
    }
    const intervalId = setInterval(() => {
      if (renderState && (renderState.state === 'completed' || renderState.state === 'failed')) {
        clearInterval(intervalId)
        return
      }
      requestRenderState()
    }, 3000)
    return () => clearInterval(intervalId)
  }, [])

  // cancel clicked
  useEffect(() => {
    if (!cancelClicked) {
      return
    }
    // request removing from server render job list 
    fetch(`${REACT_APP_API_URL}/renderVideo/${renderId}`, { method: 'DELETE' })
    onCancel()
  }, [cancelClicked])

  return (
      <div className="VideoFetcher">
        <div>
          Render id: {renderId}
        </div>
        <div>
          Client state:
            {
              renderState && renderState.state === 'completed' ? 'completed' :
              renderState && renderState.state === 'failed' ? 'failed' : 'waiting...'
            }
        </div>
        <div>
          Real state: { renderState ? renderState.state : 'unknown' }
        </div>
        {renderState && renderState.state === 'completed' && <div>
          <video src={renderState.result} controls loop autoplay />
        </div>}
        <div>
          <button onClick={() => setCancelClicked(true)}>Cancel</button>
        </div>
      </div>
  )
}

export default VideoFetcher
