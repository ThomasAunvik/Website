export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <a href="/login">Login Please...</a>
        </div>
        <div>
          <a href="/register">Or Register</a>
        </div>
        <div>
          <a href="/signout">If you are logged in...</a>
        </div>
      </div>
    </main>
  );
}
