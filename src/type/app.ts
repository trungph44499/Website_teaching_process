export type ClassificationType = 'normal' | 'abnormal' | 'annotated';

export type RoleType = 'labeler' | 'admin';

export type StepType = 'preprocessing_data' | 'training' | 'evaluation' | 'register';

export type AnotationStudioItem = {
  dynamic: boolean;
  end: number;
  fromSuggestion: boolean;
  hidden: boolean;
  id: string;
  meta: object;
  normInput: null;
  object: string;
  origin: string;
  parentID: null;
  pid: string;
  readonly: boolean;
  results: {
    from_name: string;
    id: string;
    score: null;
    to_name: string;
    type: string;
    value: {
      labels: ClassificationType[];
    };
  }[];
  score: null;
  selectedregionbg: string;
  start: number;
  type: string;
};
