import React from 'react'
import { Link } from "react-router-dom"

const PortfolioItem = (props) => {
    return(
        <Link onClick={()=>{props.viewPortfolio(props.item.vk.id)}} to={'/'}>
            <div>
                <img src={props.item.vk.photo} />
                <span>{props.item.vk.name}</span>
            </div>
        </Link>
    )
}

export default PortfolioItem;