const baseComponents = [
    { name: 'Container', remark: '容器', type: 'container' },
    { name: 'Text', remark: 'Text', type: 'normal' },
    { name: 'Image', remark: 'Image', type: 'normal' },
    { name: 'Icon', remark: 'Icon', type: 'normal' },
    { name: 'Placeholder', remark: '占', type: 'normal' }
];

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
    Text: {
        fontSize: '16',
        color: '#000',
    },
    Icon: {
    },
    Placeholder: {
    },
    /**选中项样式 */
    selected: {

    }
}
const oftenStyle = {
    Container: [
        { name: 'display', type: 'string', defaultValue: 'flex' },
        { name: 'justifyContent', type: 'string', defaultValue: 'flex' },
        { name: 'alignItems', type: 'string', defaultValue: 'center' },
        { name: 'borderRadius', type: 'string', defaultValue: '4' },
        { name: 'border', type: 'string', defaultValue: '1px solid #ff6666' },
        { name: 'flexDirection', type: 'string', defaultValue: 'column' }
    ],
    Image: [],
    Text: [
        { name: 'fontSize', type: 'string', defaultValue: '16' },
        { name: 'color', type: 'string', defaultValue: '#000' }
    ],
    Icon: [],
    Placeholder: []
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
    Icon: [
        { name: 'height', type: 'string', defaultValue: '25' },
        { name: 'width', type: 'string', defaultValue: '25' },
        { name: 'color', type: 'string', defaultValue: '#000' },
        { name: 'name', type: 'string', defaultValue: 'Chat' },
    ],
    Placeholder: [
    ],
};
export { defaultStyle, defaultProps, commonContainerStyle, baseComponents, oftenStyle }