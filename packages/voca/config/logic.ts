interface Logic {
  id: string;
  name: string;
  type:
    | 'present'
    | 'past'
    | 'present_continuous'
    | 'future'
    | 'passive'
    | 'imperative'
    | 'etc';
  typeName: string;
  value: any;
}

const s = [{ name: 's', value: 'present', go: [] }];
