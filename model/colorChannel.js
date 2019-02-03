const colorChannel = class ColorChannel {

    constructor(name, decimalValue = 0, manipulate = false){
        this.channelName = name;
        this.color = decimalValue;
        this.isActive = manipulate;
    };

    manipulate = (value) => this.isActive ? this.color + decimalValue % 256 : this.color;


};

export default colorChannel;