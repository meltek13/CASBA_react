const Event = ({ event }) => (
  <div>
    <p>
      {event.title}
      :
      {' '}
      {event.description}
    </p>
    <hr />
  </div>

);

export default Event;
