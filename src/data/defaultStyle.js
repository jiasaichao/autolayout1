const defaultStyle = {
    Container: {
        //display:'flex',
        height: '50',
        background: '#F4F6FB'
    },
    /**选中项样式 */
    selected: {

    }
}
const props={
    Text:[
        {name:'content',type:'string',defaultValue:''}
    ]
};
const props1 = [
    {
        name: 'Text', props: [
            { name: 'content', type: 'string', defaultValue: '' }
        ]
    }
];
export { defaultStyle, props }