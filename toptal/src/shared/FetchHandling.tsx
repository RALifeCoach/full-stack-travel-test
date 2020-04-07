import React, {memo, useContext, useEffect, useState} from 'react';
import Loading from "./Loading";
import SnackMessage from "./SnackMessage";
import MainContext from "../Main/MainContext";

export interface IProps {
  status: {status: string, response: any, exception: Error};
  title?: string;
}

const FetchHandling = (props: IProps) => {
  const { status, title } = props;
  const [error, setError] = useState('');
  const {mainDispatch} = useContext(MainContext);

  useEffect(() => {
    if (status.status === 'failure') {
      if (status.exception.message === 'Token Expired') {
        alert("The security token has expired. Please login again.");
        localStorage.removeItem('toptal:user');
        mainDispatch({type: 'user', value: null});
        return;
      }
      setError(status.exception.message);
    }
  }, [status.status, status.exception]);

  return (
    <>
      <Loading open={status.status === 'in progress'} title={title}/>
      <SnackMessage
        open={error !== ''}
        message={`Fetch Failed with message: ${error}`}
        onClose={() => setError('')}
        type={'error'}
      />
    </>
  );
};

export default memo(FetchHandling);
