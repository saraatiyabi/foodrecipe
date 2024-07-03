import React from 'react'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

export default function ErrorBox() {
    return (
        <div className='error-message'>
            <p>
                {
                    <div className='error-message-section'>
                        <ReportProblemOutlinedIcon className='error-icon' />
                        <p>No recipes found! please try again later :(</p>
                    </div>
                }
            </p>
        </div>
    )
}
