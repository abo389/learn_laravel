import { useForm } from "@inertiajs/react";
import { use } from "react";

export default function Create ()
{
  const { data, setData, post, processing, errors } = useForm( {
    body: "",
  } );
  
  function handleSubmit ( e )
  {
    e.preventDefault();
    post( "/posts" );
  }

  return <>
    <h1 className="title">Create a new post</h1>
    <div className="container w-1/2 mx-auto">
      <form onSubmit={ handleSubmit }>
        <textarea
          rows="10"
          placeholder="write a post ..."
          value={ data.body }
          className={errors.body && '!ring-red-500' }
          onChange={ ( e ) => setData( "body", e.target.value ) }
        ></textarea>
        { errors.body && <p className="error">{ errors.body }</p> }
        <button disabled={processing} type="submit" className="primary-btn mt-4">Create</button>
      </form>
    </div>
  </>;
}