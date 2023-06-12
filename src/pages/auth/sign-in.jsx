import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_SIGNIN_ADMIN } from "../../utils/constant";
import { storeAuth } from "@/utils/auth";

export function SignIn() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isAuth, setIsAuth] = useState(true);

  const navigate = useNavigate();

  const onChangeHandler = (e, set) => {
    set(e.target.value)
  }

  const onClickHandler = async () => {
    await axios.post(BASE_SIGNIN_ADMIN, {
      username,
      password
    }).then((res) => {
      storeAuth(res.data);
      navigate('/dashboard/home');
    }).catch(() => {
      setIsAuth(false);
    });
  }

  return (
    <>
      <img
        src="../../../public/img/bg_page.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-5">
            {!isAuth ? (
              <div className="border-red-400 text-red-700 text-center">
                <strong class="font-bold">Invalid Login!</strong>
              </div>
            ) : null}
            <Input type="text" label="Username" size="lg" value={username} onChange={(e) => onChangeHandler(e, setUsername)} required />
            <Input type="password" label="Password" size="lg" value={password} onChange={(e) => onChangeHandler(e, setPassword)} required />
            {/* <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={() => onClickHandler()}>
              Sign In
            </Button>
            {/* <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography> */}
          </CardFooter>
        </Card>
      </div >
    </>
  );
}

export default SignIn;
