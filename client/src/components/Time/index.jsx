import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './Time.scss';

const Time = ({ date }) => 
    format(date, "HH:mm")

Time.propTypes = {
    date: PropTypes.object
}

export default Time;