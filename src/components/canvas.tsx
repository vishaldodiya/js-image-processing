import * as React from "react";

export interface Image { src: Array<string> };

export class Canvas extends React.Component<Image, {}, any> {

    canvasRef: any;
    context: any;
    imageData: any;

    componentDidMount() {
        this.updateCanvas();

        let btnInvert: any = this.refs.btnInvert;
        let btnGreyScale: any = this.refs.btnGrey;
        let btnReset: any = this.refs.btnReset;

        btnInvert.addEventListener( 'click', this.invertColor.bind( this ) );
        btnGreyScale.addEventListener( 'click', this.convertGreyScale.bind( this ) );
        btnReset.addEventListener( 'click', this.resetImage.bind( this ) );
    }

    updateCanvas() {

        const img = new Image( 300, 300 );

        this.canvasRef = this.refs.canvas;
        this.canvasRef.width = 300;
        this.canvasRef.height = 300;
        this.context = this.canvasRef.getContext( '2d' );
        img.src = this.props.src[0];
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            this.context.drawImage( img, 0, 0, 300, 300 );
            this.imageData = this.context.getImageData( 0, 0, 300, 300 );
        }
        this.canvasRef.addEventListener( 'mousemove', this.colorPicker.bind( this ) );
    }

    colorPicker( event: any ) {

        var x = event.layerX;
        var y = event.layerY;
        var imageData = this.context.getImageData( x, y, 1, 1 );
        var data = imageData.data;
        var rgba = 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + ( data[3] / 255 ) + ')';
        let colorPicker: any = this.refs.colorPicker;

        colorPicker.style.background = rgba;
        colorPicker.textContent = rgba;
    }

    invertColor() {
        var imageData = this.context.getImageData( 0, 0, 300, 300 );
        let data = imageData.data;

        for( var i = 0; i < data.length; i += 4 ) {
            data[i] = 255 - data[i];
            data[i+1] = 255 - data[i+1];
            data[i+2] = 255 - data[i+2];
        }

        this.context.putImageData( imageData, 0, 0 );
    }

    convertGreyScale() {
        var imageData = this.context.getImageData( 0, 0, 300, 300 );
        let data = imageData.data;

        for( var i = 0; i < data.length; i += 4 ) {
            var avg = ( data[i] + data[i+1] + data[i+2] ) / 3;
            data[i] = avg;
            data[i+1] = avg;
            data[i+2] = avg;
        }

        this.context.putImageData( imageData, 0, 0 );
    }

    resetImage() {
        this.context.putImageData( this.imageData, 0, 0 );
    }

    render() {
        return ( 
            <div className="container">
                <canvas ref="canvas"></canvas>
                <div ref="colorPicker" className="color-picker"></div>
                <div className="btnContainer">
                    <button ref="btnInvert">Invert Color</button>
                    <button ref="btnGrey">Convert GreyScale</button>
                    <button ref="btnReset">Reset</button>
                </div>
            </div>
        )
    }
}