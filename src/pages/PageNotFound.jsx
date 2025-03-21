function PageNotFound() {
  return (
    <section className="h-screen">
      <div className="py-8 px-4 mx-auto">
        <div className="mx-auto max-w-screen-sm text-center h-96 place-content-center">
          <h1 className="mb-4 text-9xl tracking-tight font-extrabold text-actioncolor">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-slate-200">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-slate-100">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <a
            href="/"
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:underline"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
