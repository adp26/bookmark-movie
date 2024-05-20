function Title({ state }) {
    return <div className='text-sky-200 font-extrabold text-3xl w-full pb-1'>
        {state ? 'Update' : 'Create'} Movie
    </div>;
}
export default Title;