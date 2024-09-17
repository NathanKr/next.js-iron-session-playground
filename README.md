<h2>Introduction</h2>
<p>This project demonstrates how to securely persist session data using encrypted cookies with iron-session. While a Next.js app is used in this demonstration, the solution is also compatible with Node.js/Express</p>

<h2>Motivation</h2>
<p>In an application, post2youtube, I need to login to Google to retrieve a code that is used to obtain an access token for the YouTube API. I have a POC for this, but I need to log in every time. The solution is to persist the access token that we receive, which can be stored in a cookie (check the cookie POC <a href=https://github.com/NathanKr/cookie-playground>cookie-playground</a>). However, the cookie appears in clear text, posing a security risk</p>


<h2>Solution</h2>
<p>The package iron-session offers a solution by using cookies to store session data but encrypting them for security. It can be seamlessly integrated with Next.js API routes and server-side props, ensuring both security and convenience</p>


<h2>API : set value in cookie : /api/set-cookie</h2>
<p>The /api/set-cookie route allows you to set a value in the session cookie and store it in encrypted form</p>

<pre>
<code class='language-typescript'>  
    const session = await getIronSessionDefaultMaxAge(req, res);
    session.value1 = COOKIE_VALUE1;
    await session.save(); // --- encrypt the session data and set cookie
</code>
</pre>

<h2>API : get value from cookie : /api/get-cookie</h2>
<p>The /api/get-cookie route retrieves the encrypted value stored in the session cookie</p>

<pre>
<code class='language-typescript'>  
  const session = await getIronSessionDefaultMaxAge(req, res);
  const cookieValue = session.value1;

</code>
</pre>

<h2>API : Helper function: getIronSessionDefaultMaxAge</h2>
<p>The getIronSessionDefaultMaxAge helper function defines default session options, such as password, cookie name, and max age</p>


<pre>
<code class='language-typescript'>  
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
</code>
</pre>

<p>getIronSessionDefaultMaxAge is just helper function but you can use sessionOptions in getIronSession to control more info like </p>

<pre>
<code class='language-typescript'>  
{
    secure: process.env.NODE_ENV === "production", // --- default is false so can be used in http and https
    httpOnly: true, // --- default is true , cookie not accessed by javascript code on the browser
    maxAge: 60 * 60 * 24 * 7, // --- here 1 week but default is undefined so cookie delete when browser close
    path: "/", // --- default to / so relevant to all pages
}
</code>
</pre>


<h2>Password</h2>
<p> A password is used to create a private key to encrypt the cookie stored in the browser's storage.</p>

<p>You can use <a href="https://1password.com/password-generator">1Password's password generator</a> to create a strong password. Note that it generates 20-character passwords by default, while iron-session requires 32 characters, so you can duplicate it to meet this requirement.</p>

<p>The value I store in the cookie is "value1: HelloWorld", but it is encrypted in the browser and not accessible as clear text.</p>



<img src='https://github.com/NathanKr/next.js-iron-session-playground/blob/main/figs/cookie-encrypyted-by-iron-session.png?raw=true'>

