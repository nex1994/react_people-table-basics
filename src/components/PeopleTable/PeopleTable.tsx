import { Person } from '../../types';
import { PersonRow } from '../PersonRow';

type Props = {
  people?: Person[] | null;
};

export const PeopleTable = ({ people }: Props) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <table
        data-cy="peopleTable"
        className="
                    table
                    is-striped
                    is-hoverable
                    is-narrow
                    is-fullwidth"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people?.map(person => {
            return (
              <PersonRow key={person.name} people={people} person={person} />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
