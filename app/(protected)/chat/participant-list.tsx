export { ParticipantList };

type Participant = {
  id: string;
  name: string;
  isActive: boolean;
}

const sampleParticipants: Participant[] = [
  {
    id: '1',
    name: 'John Doe',
    isActive: true
  },
  {
    id: '2',
    name: 'Jane Doe',
    isActive: false
  },
  {
    id: '3',
    name: 'Alice Doe',
    isActive: true
  },
  {
    id: '4',
    name: 'Bob Doe',
    isActive: false
  },
  {
    id: '5',
    name: 'Charlie Doe',
    isActive: true
  },
  {
    id: '6',
    name: 'Denise Doe',
    isActive: false
  },
  {
    id: '7',
    name: 'Eva Doe',
    isActive: true
  },
  {
    id: '8',
    name: 'Frank Doe',
    isActive: false
  },
  {
    id: '9',
    name: 'Grace Doe',
    isActive: true
  },
  {
    id: '10',
    name: 'Hank Doe',
    isActive: false
  },
  {
    id: '11',
    name: 'Ivy Doe',
    isActive: true
  },
  {
    id: '12',
    name: 'Jack Doe',
    isActive: false
  },
  {
    id: '13',
    name: 'Kathy Doe',
    isActive: true
  },
  {
    id: '14',
    name: 'Leo Doe',
    isActive: false
  },
  {
    id: '15',
    name: 'Mona Doe',
    isActive: true
  },
  {
    id: '16',
    name: 'Nate Doe',
    isActive: false
  },
  {
    id: '17',
    name: 'Olivia Doe',
    isActive: true
  },
  {
    id: '18',
    name: 'Paul Doe',
    isActive: false
  },
  {
    id: '19',
    name: 'Quincy Doe',
    isActive: true
  },
  {
    id: '20',
    name: 'Rita Doe',
    isActive: false
  },
  {
    id: '21',
    name: 'Steve Doe',
    isActive: true
  },
  {
    id: '22',
    name: 'Tina Doe',
    isActive: false
  },
  {
    id: '23',
    name: 'Ulysses Doe',
    isActive: true
  },
  {
    id: '24',
    name: 'Vera Doe',
    isActive: false
  },
  {
    id: '25',
    name: 'Will Doe',
    isActive: true
  },
  {
    id: '26',
    name: 'Xena Doe',
    isActive: false
  },
  {
    id: '27',
    name: 'Yara Doe',
    isActive: true
  },
  {
    id: '28',
    name: 'Zack Doe',
    isActive: false
  },
  {
    id: '29',
    name: 'Amy Doe',
    isActive: true
  },
  {
    id: '30',
    name: 'Brian Doe',
    isActive: false
  },
];

const ParticipantList: React.FC = () => {

  const participants = sampleParticipants;

  return (
    <div className="bg-white flex flex-col h-full rounded space-y-4">
      <List
        participants={participants.filter(p => p.isActive)}
      />
      <hr className="border-t border-gray-300 my-4" />
      <List
        participants={participants.filter(p => !p.isActive)}
      />
    </div>
  );
}

const List = ({ participants }: { participants: Participant[] }) => (
  <div className="flex-col items-center justify-between py-2 px-4">
    {participants.map(p =>
      <div key={p.id} className={p.isActive ? "text-inherit font-bold" : "text-slate-500"}>{p.name}</div>)}
  </div>
);