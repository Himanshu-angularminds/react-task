  import NextAuth from "next-auth";
  import CredentialsProvider from "next-auth/providers/credentials";
  
  export default NextAuth({
    
    providers: [
      
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        credentials: {
          username: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //   signIn: '/',
    // },
    // callbacks: {
    //   async authorize(credentials) {
    //     console.log(credentials,"credentials");
    //     try {
    //       const response = await fetch(`${process.env.NEXTAUTH_URL}`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           // "Access-Control-Allow-Origin": "*", 
    //           // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", 
    //           // "Access-Control-Allow-Headers": "Content-Type, Authorization",
    //         },
    //         body: JSON.stringify({
    //           username: credentials?.email,
    //           password: credentials?.password,
    //         }),
    //       });

    //       if (response.ok) {
    //         const user = await response.json();
    //         // Return user data to be stored in the session
    //         return user;
    //       } else {
    //         // If authentication fails, return null
    //         console.error("Authentication failed:", response.statusText);
    //         return null;
    //       }
    //     } catch (error) {
    //       console.error("API Error:", error);
    //       return null;
    //     }
    //   },

    //   async jwt({ token, user }) {
    //     return { ...token, ...user };
    //   },
    //   async session({ session, token, user }) {
    //     // Store user data in the session
    //     session.user = token;
    //     return session;
    //   },
      
    // },
  });
