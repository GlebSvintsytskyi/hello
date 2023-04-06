import React from 'react';
import { Button as BaseBatton } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.scss';

const Button = props => {
    return (
        <BaseBatton {...props} className={ classNames('button', props.className, { 
            'button--large':props.size === 'large' 
        })}/>
    )
}

Button.propTypes = {
    className: PropTypes.string
};

export default Button;