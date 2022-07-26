import { ReactNode, useEffect } from "react"

type ModalProps = {
  children: ReactNode,
  isOpen: boolean,
  onRequestClose: () => void,
}

let close = () => { };

window.addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-container') && document.getElementById('modal-container')?.classList.contains('itsOpen')) {
    close()
  }
})
window.addEventListener('keyup', (e) => {
  if (e.key === 'Escape' && document.getElementById('modal-container')?.classList.contains('itsOpen')) {
    close()
  }
})

export function Modal({ children, ...props }: ModalProps) {

  close = () => {
    props.onRequestClose()
  }

  useEffect(() => {
    if (props.isOpen) {
      document.getElementById('confirmButtonModal')?.focus()
    }
  }, [props.isOpen])

  return (
    <div id="modal-container" className={`${props.isOpen ? 'itsOpen' : ''}`}>
      <div className="modal">
        {children}
      </div>
    </div>
  )
}