const defaultStyle = {
    Container: {
        //display:'flex',
        height: '50',
        background: '#F4F6FB'
    },
    Image: {
        width: '60',
        height: '42',
    },
    Icon: {
    },
    /**选中项样式 */
    selected: {

    }
}
const commonContainerStyle = [
    { name: 'display', defaultValue: 'flex' },
    { name: 'justifyContent', defaultValue: 'center' },
    { name: 'alignItems', defaultValue: 'center' },
    { name: 'borderRadius', defaultValue: '4' },
    { name: 'border', defaultValue: '1px solid #ff6666' },
];
const defaultProps = {
    Text: [
        { name: 'content', type: 'string', defaultValue: '' }
    ],
    Container: [
    ],
    Image: [
        { name: 'src', type: 'string', defaultValue: 'image/placeholder.jpg' }
    ],
    Icon:[
        {name:'height', type:'string', defaultValue:'25'},
        {name:'width', type:'string', defaultValue:'25'},
        {name:'color', type:'string', defaultValue:'#000'},
        {name:'name', type:'string', defaultValue:'Chat'},
    ]
};
export { defaultStyle, defaultProps,commonContainerStyle }