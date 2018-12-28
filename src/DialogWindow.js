import React from 'react'

export default class DialogWindow extends React.Component{
    componentDidMount(){
        let butOpen = this.refs["dialog__open"],
            butClose = this.refs["dialog__close"],
            dialog = this.refs["dialog"]

        butClose.addEventListener( "click", () => dialog.close() )
        butOpen.addEventListener( "click", () =>  dialog.showModal() )

    }
    render(){
        const {childElm, btnText} = this.props
        return(
            <div>
                <button ref={'dialog__open'} className="dialog__open">{btnText}</button>
                <dialog ref={'dialog'} className="dialog__animation">
                    <button ref={'dialog__close'} className="dialog__close">x</button>
                    {childElm}
                </dialog>
            </div>
        )
    }
}