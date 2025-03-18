export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
  
  export const colourOptions: readonly ColourOption[] = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];
  
  export interface FlavourOption {
    readonly value: string;
    readonly label: string;
    readonly rating: string;
  }
  
  export const flavourOptions: readonly FlavourOption[] = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
    { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
  ];
  
  export interface StateOption {
    readonly value: string;
    readonly label: string;
  }
  
  export const stateOptions: readonly StateOption[] = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FM', label: 'Federated States Of Micronesia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'GU', label: 'Guam' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MH', label: 'Marshall Islands' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PW', label: 'Palau' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VI', label: 'Virgin Islands' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ];
  
  export const optionLength = [
    { value: 1, label: 'general' },
    {
      value: 2,
      label:
        'Evil is the moment when I lack the strength to be true to the Good that compels me.',
    },
    {
      value: 3,
      label:
        "It is now an easy matter to spell out the ethic of a truth: 'Do all that you can to persevere in that which exceeds your perseverance. Persevere in the interruption. Seize in your being that which has seized and broken you.",
    },
  ];
  
  export const dogOptions = [
    { id: 1, label: 'Chihuahua' },
    { id: 2, label: 'Bulldog' },
    { id: 3, label: 'Dachshund' },
    { id: 4, label: 'Akita' },
  ];
  
  export interface GroupedOption {
    readonly label: string;
    readonly options: readonly ColourOption[] | readonly FlavourOption[];
  }
  
  export const groupedOptions: readonly GroupedOption[] = [
    {
      label: 'Colours',
      options: colourOptions,
    },
    {
      label: 'Flavours',
      options: flavourOptions,
    },
  ];
  
  export interface SkillOption {
    readonly value: string;
    readonly label: string;
    readonly image:String;
  }
  export const programmingSkills: readonly SkillOption[] = [
    { value: 'JS', label: 'JavaScript', image: 'https://img.icons8.com/color/48/javascript.png' },
    { value: 'TS', label: 'TypeScript', image: 'https://img.icons8.com/color/48/typescript.png' },
    { value: 'PY', label: 'Python', image: 'https://img.icons8.com/color/48/python.png' },
    { value: 'RB', label: 'Ruby', image: 'https://img.icons8.com/color/48/ruby-programming-language.png' },
    { value: 'JAVA', label: 'Java', image: 'https://img.icons8.com/color/48/java-coffee-cup-logo.png' },
    { value: 'C', label: 'C', image: 'https://img.icons8.com/color/48/c-programming.png' },
    { value: 'CPP', label: 'C++', image: 'https://img.icons8.com/color/48/c-plus-plus-logo.png' },
    { value: 'PHP', label: 'PHP', image: 'https://img.icons8.com/officel/48/php-logo.png' },
    { value: 'R', label: 'R', image: 'https://img.icons8.com/color/48/r-project.png' },
    { value: 'GO', label: 'Go', image: 'https://img.icons8.com/color/48/golang.png' },
    { value: 'SWIFT', label: 'Swift', image: 'https://img.icons8.com/color/48/swift.png' },
    { value: 'KOTLIN', label: 'Kotlin', image: 'https://img.icons8.com/color/48/kotlin.png' },
    { value: 'C_SHARP', label: 'C#', image: 'https://img.icons8.com/color/48/c-sharp-logo.png' },
    { value: 'HTML', label: 'HTML', image: 'https://img.icons8.com/color/48/html-5.png' },
    { value: 'CSS', label: 'CSS', image: 'https://img.icons8.com/color/48/css3.png' },
    { value: 'NODE', label: 'Node.js', image: 'https://img.icons8.com/color/48/nodejs.png' },
    { value: 'REACT', label: 'React.js', image: 'https://img.icons8.com/color/48/react-native.png' },
    { value: 'ANGULAR', label: 'Angular', image: 'https://img.icons8.com/color/48/angularjs.png' },
    { value: 'VUE', label: 'Vue.js', image: 'https://img.icons8.com/color/48/vue-js.png' },
    { value: 'NEXT', label: 'Next.js', image: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/external-next-js-a-javascript-framework-for-building-react-applications-logo-color-tal-revivo.png' },
    { value: 'SASS', label: 'SASS', image: 'https://img.icons8.com/color/48/sass.png' },
    { value: 'BOOTSTRAP', label: 'Bootstrap', image: 'https://img.icons8.com/color/48/bootstrap.png' },
    { value: 'MYSQL', label: 'MySQL', image: 'https://img.icons8.com/color/48/mysql-logo.png' },
    { value: 'POSTGRESQL', label: 'PostgreSQL', image: 'https://img.icons8.com/color/48/postgreesql.png' },
    { value: 'MONGO', label: 'MongoDB', image: 'https://img.icons8.com/color/48/mongodb.png' },
    { value: 'DOCKER', label: 'Docker', image: 'https://img.icons8.com/color/48/docker.png' },
    { value: 'KUBERNETES', label: 'Kubernetes', image: 'https://img.icons8.com/color/48/kubernetes.png' },
    { value: 'AWS', label: 'AWS', image: 'https://img.icons8.com/color/48/amazon-web-services.png' },
    { value: 'AZURE', label: 'Azure', image: 'https://img.icons8.com/color/48/azure-1.png' },
    { value: 'GCP', label: 'Google Cloud', image: 'https://img.icons8.com/color/48/google-cloud.png' },
    { value: 'FLASK', label: 'Flask', image: 'https://img.icons8.com/ios/48/flask.png' },
    { value: 'LARAVEL', label: 'Laravel', image: 'https://img.icons8.com/color/48/laravel.png' },
    { value: 'GRAPHQL', label: 'GraphQL', image: 'https://img.icons8.com/color/48/graphql.png' },
    { value: 'TENSORFLOW', label: 'TensorFlow', image: 'https://img.icons8.com/color/48/tensorflow.png' },
    { value: 'JENKINS', label: 'Jenkins', image: 'https://img.icons8.com/color/48/jenkins.png' },
    { value: 'VAGRANT', label: 'Vagrant', image: 'https://img.icons8.com/color/48/vagrant.png' },
    { value: 'UNITY', label: 'Unity', image: 'https://img.icons8.com/ios-filled/48/unity.png' },
    { value: 'ANDROID', label: 'Android', image: 'https://img.icons8.com/color/48/android-os.png' },
    { value: 'IOS', label: 'iOS', image: 'https://img.icons8.com/color/48/ios-logo.png' },
  ];
  
  