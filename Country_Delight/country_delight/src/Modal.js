import React from 'react'
import  ReactDOM from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '10%',
    left: '5%',
    backgroundColor: 'rgb(234, 134, 34)',
    transform: 'transaction(-50%, -50%)',
    zIndex: 100,
    height: '90%',
    width: '90%',
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(0, 0, 0, .7)',
    zIndex: 100
}

export default function Modal({children, onclose}) {
  return ReactDOM.createPortal(
    <>
        <div style={OVERLAY_STYLE} />
        <div style={MODAL_STYLES}>
            <button className='btn bg-danger fs-4 text-white' style={{marginLeft: "90%", marginTop: "-35px"}} onClick={onclose}>X</button>
            {children}
        </div>
    </>,
    document.getElementById('cart-root')
  )
}
