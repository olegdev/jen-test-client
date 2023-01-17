import { useState, useEffect } from 'react'
const { REACT_APP_API_URL } = process.env

function VideoFetcher({ renderId, onComplete, onCancel }) {
  const [cancelClicked, setCancelClicked] = useState(false)
  const [renderState, setRenderState] = useState(null)

  // start fetching every x seconds
  useEffect(() => {
    async function requestRenderState() {
      const resp = await fetch(`${REACT_APP_API_URL}/renderVideo/${renderId}`)
      const data = await resp.json()
      setRenderState(data)
      if (data.state === 'completed') {
        onComplete()
      }
      if (data.state === 'completed' || data.state === 'failed') {
        clearInterval(intervalId)
      }
    }
    const intervalId = setInterval(() => {
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
          <video src={renderState.result.replace('ipfs://','https://digitalpaint.mypinata.cloud/ipfs/')} controls loop muted type="video\/mp4" />
        </div>}
        <div>
          <button onClick={() => setCancelClicked(true)}>Cancel</button>
        </div>
      </div>
  )
}

export default VideoFetcher
