import { notification } from 'antd';

const succesNatification = ({ duration = 3 }) => {  
  const type = 'success'
  notification[type]({
      message: 'Success!',
      description: 'Authorization was successful',
      duration,
  });
}

export default succesNatification;