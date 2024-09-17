<h2>Introduction</h2>
This project demonstrates how to securely persist session data using encrypted cookies with iron-session. Next.js app is used but it can be used also on Node.js/Express ...

<h2>Motivation</h2>
In an application post2youtube i need to login to google to get a code string which is used to get access token for youtube api. I have poc for this but i need to login every time. The solution is to persist the access token that we got and you can persist it in cookie (check cookie poc <a href='https://github.com/NathanKr/cookie-playground'>cookie-playground</a>) but it appear as clear text which is a security risk. 

<h2>Solution</h2>
A package name iron-sesion which use cookie but also encrypt it and can be used on next.js api and also get server side props

<h2>API</h2>

<h3>set value in cookie</h3>

```ts
    const session = await getIronSessionDefaultMaxAge(req, res);
    session.value1 = COOKIE_VALUE1;
    await session.save(); // --- encrypt the session data and set cookie
```

<h3>get value from cookie</h3>

```ts
  const session = await getIronSessionDefaultMaxAge(req, res);
  const cookieValue = session.value1;

```

<h3>getIronSessionDefaultMaxAge</h3>


```ts
function getIronSessionDefaultMaxAge(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<IronSession<IronSessionData>> {
  const sessionOptions = {
    password: process.env.IRON_SESSION_PASSWORD!,
    cookieName: COOKIE_NAME,
    maxAge: 60 * 60 * 24 * 7, // --- here 1 week
  };
  return getIronSession<IronSessionData>(req, res, sessionOptions);
}
```
getIronSessionDefaultMaxAge is just helper function but you can use sessionOptions in getIronSession to control more info like 

```ts
{
    secure: process.env.NODE_ENV === "production", // --- default is false so can be used in http and https
    httpOnly: true, // --- default is true , cookie not accessed by javascript code on the browser
    maxAge: 60 * 60 * 24 * 7, // --- here 1 week but default is undefined so cookie delete when browser close
    path: "/", // --- default to / so relevant to all pages
}
```

<h3>Password</h3>
<p> A password is used to create private key to encrypt the cookie stored on the browser storage</p>

<p>You can use https://1password.com/password-generator but it create 20 char password where iron-session need 32 , so i duplicated it</p>

<p>The value i store in the cookie is value1 : HelloWorld but you can see its is encrypted on the browser</p>



<img src='https://raw.githubusercontent.com/NathanKr/next.js-iron-session-playground/main/figs/cookie-encrypyted-by-iron-session.png'>

