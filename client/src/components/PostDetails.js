export default function PostDetails({post}) {
  return (
    <div className="selected-post">
      {post.images.map((image, index) => {
        return (
          <span key={index} className="image-wrapper">
            <img src={image} className="image" alt="img" />;
          </span>
        );
      })}
      <div className="selected-post-details">
        <p>Location: {post.address}</p>
        <p>
          Area: {post.bhk && post.bhk > 0 ? `${post.bhk} Bhk ` : null}
          {post.room && post.room > 0 ? `${post.room} Room` : null}
        </p>
        <p>Rent: Rs {post.rent} Per month</p>
        <p>Phone: {post.contact.phoneNumber}</p>
        <p>Email: {post.contact.email}</p>
        <p>Description: {post.description}</p>
      </div>
    </div>
  );
}
