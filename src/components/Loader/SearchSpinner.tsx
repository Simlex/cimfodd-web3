import { FunctionComponent, ReactElement } from 'react';
import LoaderStyle from '../../styles/Loader.module.scss';

interface SearchSpinnerProps {
    backgroundColor?: any;
    lightTheme?: boolean; 
}

const SearchSpinner: FunctionComponent<SearchSpinnerProps> = ({ backgroundColor, lightTheme }): ReactElement => {
    return (
        <>
            <div className={LoaderStyle.SearchSpinnerWrapper} style={{ backgroundColor: `${backgroundColor}`, display: 'inline-flex' }}>
                <div className={LoaderStyle.searchSpinner}>
                </div>
            </div>
        </>
    );
}

export default SearchSpinner;


interface ButtonLoaderProps {
    backgroundColor?: string;
}
export const ButtonLoader: FunctionComponent<ButtonLoaderProps> = ({ backgroundColor }): ReactElement => {
    return (
        <>
            {/* <div className={LoaderStyle.btnLoaderBox} style={{ backgroundColor: `${backgroundColor}` }}>
                <span className={LoaderStyle.btnLoader}></span>
            </div> */}            
            <div className="loading-spinner"></div>
        </>
    );
}