import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Status.scss';

const Status = ({ online }) => {
    return (
        <span className={classNames('status', {'status--online' : online})}>
            Online
        </span>
    )
}

Status.propTypes = {
    online: PropTypes.bool
}

export default Status;