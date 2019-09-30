import * as React from "react";
import * as ReactDom from "react-dom";
import { Canvas } from "./components/canvas";

const images = [
    'https://images.unsplash.com/photo-1485249884563-0de923c9a8db',
    'https://images.unsplash.com/photo-1464821541677-ceb53bcf1541',
    'https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg',
    'https://images.unsplash.com/photo-1426001094903-70f302dc2d24',
    'https://images.unsplash.com/photo-1456030680012-9aa5bd962cc4',
]

ReactDom.render(
    <Canvas src={images}></Canvas>,
    document.getElementById( 'js-image-processing' )
);
