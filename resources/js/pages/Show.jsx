export default function Show ( { post } )
{
  return (
    <div className="p-4">
      <div>
        <span>Posted at: </span>
        <span>{ new Date( post.created_at ).toLocaleTimeString() }</span>
      </div>
      <p className="m-1 p-1 border-b-2">{ post.body }</p>
    </div>
  );
}