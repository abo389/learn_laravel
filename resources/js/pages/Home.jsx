import { Link } from "@inertiajs/react";

export default function Home ( { posts } )
{
  console.log( posts );
  return (
    <div>
      <h1 className="title">Home</h1>
      <div className="container">
        { posts.data.map( post => (
          <div key={ post.id } className="p-4 border-b-2">
            <div>
              <span>Posted at: </span>
              <span>{ new Date( post.created_at ).toLocaleTimeString() }</span>
            </div>
            <p className="m-1 p-1">{ post.body }</p>
            <Link href={ `/posts/${ post.id }` } className="btn btn-link">Read more...</Link>
          </div> ) ) }
      </div>
      <div className="container text-center my-6">
        { posts.links.map( link => (
          <span key={ link.label + "parent" }>
            { link.url ? (
              <Link
                preserveScroll
                key={ link.label }
                href={ link.url }
                className={ `p-1 mx-1 ${ link.active ? 'text-blue-500 font-bold' : '' }` }
              >
                { link.label }
              </Link> ) :
              <span key={ link.label + "1" } className="p-1 mx-1 text-slate-300">
                { link.label }
              </span>
            }
          </span>
        ) ) }
      </div>
    </div>
  );
}