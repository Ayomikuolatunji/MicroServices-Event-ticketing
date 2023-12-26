import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface RequestOptions {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: Record<string, any>;
  onSuccess?: (data: any) => void;
}

export interface UseRequest {
  errors: JSX.Element | null;
  sendRequest: (props?: Record<string, any>) => Promise<any>;
}

const useRequest = ({ url, method, body, onSuccess }: RequestOptions): UseRequest => {
  const [errors, setErrors] = useState<JSX.Element | null | any>(null);

  const sendRequest = async (props: Record<string, any> = {}): Promise<any> => {
    try {
      const res: AxiosResponse = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        setErrors(null);
        onSuccess(res.data);
      }
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError | any;
        const error = (
          <div className="alert alert-danger">
            <h4>Ooops....</h4>
            <ul className="my-0">
              {axiosErr.response?.data.errors.map((err: any, index: number) => (
                <li key={index}>{err.message}</li>
              ))}
            </ul>
          </div>
        );

        setErrors(error);
      }
    }
  };

  return { errors, sendRequest };
};

export default useRequest;
