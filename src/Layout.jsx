import './layout.scss';

export const Layout = ({ children }) => {
    return (
        <div className='layout'>
            <div className='layout__children'>
                {children}
            </div>
        </div>
    )
}
