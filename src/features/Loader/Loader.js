import BounceLoader from "react-spinners/BounceLoader";
import {css} from "@emotion/react";
import React from "react";

import './Loader.css';

const override = css`
  display: block;
  margin: calc(50vh - 150px) auto;
  border-color: red;
`;

export const Loader = () => {
    return (
        <div className={'loader'}>
            <BounceLoader
                css={override}
                color={"#36D7B7"}
                loading={true}
                size={150}/>
        </div>
    )
}