import Button from 'react-bootstrap/Button';
import { Connect } from '../components/connect';
import { Input } from '../components/base/input';
import { PoolSelector } from '../components/poolSelector';

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem', gap: '1rem' }}>
        <Connect />
        <PoolSelector />

        <Input label="_ available" value="4000" disabled />
        <Input label="_ Supplied" value="2000" disabled />
        <Input label="Value in USD" value="2000" disabled />
        <Button variant="primary">Approve</Button>
      </div>
    </>
  );
}
