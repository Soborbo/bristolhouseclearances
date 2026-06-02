export interface Area {
  name: string;
  slug: string;
  region: string;
  regionSlug: string;
  tier: 1 | 2 | 3;
  postcodes: string[];
  propertyTypes: string[];
  avgPropertyPrice?: string;
  nearestRecyclingCentre: string;
  localCharities: string[];
  serviceFocus: 'probate-estate' | 'landlord-tenant' | 'family-downsizing' | 'mixed';
  description: string;
  localKnowledge: string;
}

export interface Region {
  name: string;
  slug: string;
  description: string;
  areas: string[]; // area slugs
}

export const regions: Region[] = [
  {
    name: 'Central Bristol',
    slug: 'central-bristol',
    description: 'Covering BS1, BS2, BS6, BS8 — from Clifton and Redland to the city centre and Harbourside.',
    areas: ['clifton', 'redland', 'cotham', 'montpelier', 'hotwells'],
  },
  {
    name: 'North Bristol',
    slug: 'north-bristol',
    description: 'Covering BS7, BS9, BS10 — Bishopston, Henleaze, Westbury-on-Trym, Stoke Bishop and surrounding areas.',
    areas: ['bishopston', 'henleaze', 'westbury-on-trym', 'stoke-bishop', 'horfield', 'ashley-down', 'southmead', 'lockleaze', 'brentry', 'sea-mills', 'shirehampton'],
  },
  {
    name: 'South Bristol',
    slug: 'south-bristol',
    description: 'Covering BS3, BS4, BS13, BS14 — Bedminster, Southville, Knowle, Totterdown and beyond.',
    areas: ['bedminster', 'southville', 'knowle', 'totterdown', 'brislington', 'windmill-hill', 'stockwood', 'bishopsworth', 'hartcliffe', 'hengrove', 'whitchurch'],
  },
  {
    name: 'East Bristol',
    slug: 'east-bristol',
    description: 'Covering BS5, BS15, BS16 — Fishponds, Easton, St George, Kingswood and the eastern suburbs.',
    areas: ['fishponds', 'easton', 'st-george', 'kingswood', 'staple-hill', 'mangotsfield', 'hanham', 'warmley'],
  },
  {
    name: 'West Bristol',
    slug: 'west-bristol',
    description: 'Covering BS8, BS9, BS11, BS20 — from Clifton Village through to Portishead.',
    areas: ['hotwells', 'sea-mills', 'shirehampton', 'avonmouth', 'portishead', 'long-ashton'],
  },
  {
    name: 'South Gloucestershire',
    slug: 'south-gloucestershire',
    description: 'Covering BS16, BS32, BS34, BS35, BS36, BS37 — Bradley Stoke, Filton, Yate, Thornbury and surrounds.',
    areas: ['downend', 'bradley-stoke', 'filton', 'yate', 'thornbury', 'emersons-green', 'winterbourne', 'chipping-sodbury'],
  },
  {
    name: 'North Somerset',
    slug: 'north-somerset',
    description: 'Covering BS20, BS21, BS48, BS49 — Portishead, Clevedon, Nailsea and the North Somerset coast.',
    areas: ['portishead', 'clevedon', 'nailsea', 'long-ashton'],
  },
  {
    name: 'Bath & Keynsham',
    slug: 'bath-and-keynsham',
    description: 'Covering BS31, BA1, BA2 — Keynsham, Bath and the surrounding B&NES area.',
    areas: ['keynsham', 'bath'],
  },
];

export const areas: Area[] = [
  // === TIER 1 (14 areas) ===
  {
    name: 'Clifton', slug: 'clifton', region: 'Central Bristol', regionSlug: 'central-bristol', tier: 1,
    postcodes: ['BS8'], propertyTypes: ['Georgian townhouses', 'Victorian terraces', 'Converted flats', 'Period apartments'],
    avgPropertyPrice: '£550,000', nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['SOFA Project', 'Emmaus Bristol', 'British Heart Foundation'],
    serviceFocus: 'probate-estate',
    description: 'Premium probate and estate clearance in one of Bristol\'s most desirable areas, handling Georgian and Victorian properties with care.',
    localKnowledge: 'The steep streets around Sion Hill and Royal York Crescent present access challenges for clearance vehicles, and many Georgian properties have narrow hallways and no rear access. We frequently clear probate properties near Clifton Village and the Downs, where homes have often been in the same family for decades. Parking on Caledonia Place and Princes Lane requires careful planning.',
  },
  {
    name: 'Redland', slug: 'redland', region: 'Central Bristol', regionSlug: 'central-bristol', tier: 1,
    postcodes: ['BS6'], propertyTypes: ['Victorian terraces', 'Edwardian houses', 'Student HMOs', 'Family homes'],
    avgPropertyPrice: '£475,000', nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['SOFA Project', 'Emmaus Bristol'],
    serviceFocus: 'mixed',
    description: 'House clearance in Redland covering Victorian terraces, student lets and family homes in this popular north-central neighbourhood.',
    localKnowledge: 'Redland is split between large family homes on streets like Redland Road and Cranbrook Road, and student HMOs around Cotham Hill. Parking is restricted across much of BS6, so we use smaller vehicles where needed. The mix of long-term residents and student turnover means we handle everything from probate clearances in family homes to end-of-year student flat clears.',
  },
  {
    name: 'Bishopston', slug: 'bishopston', region: 'North Bristol', regionSlug: 'north-bristol', tier: 1,
    postcodes: ['BS7'], propertyTypes: ['Victorian terraces', 'Edwardian semis', 'Family homes'],
    avgPropertyPrice: '£450,000', nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['SOFA Project', 'Salvation Army'],
    serviceFocus: 'family-downsizing',
    description: 'Professional clearance services in Bishopston, a family-friendly neighbourhood with character properties along Gloucester Road.',
    localKnowledge: 'The Victorian and Edwardian terraces along Gloucester Road and the streets running off it — Egerton Road, Brynland Avenue, Bishop Road — are our most frequent Bishopston clearances. Many are family homes where residents have lived for 30+ years. Loft conversions are popular here, and we often clear lofts ahead of building work. On-street parking is competitive, particularly on match days near the Memorial Stadium.',
  },
  {
    name: 'Henleaze', slug: 'henleaze', region: 'North Bristol', regionSlug: 'north-bristol', tier: 1,
    postcodes: ['BS9'], propertyTypes: ['Detached houses', '1930s semis', 'Bungalows', 'Family homes'],
    avgPropertyPrice: '£500,000', nearestRecyclingCentre: 'Avonmouth',
    localCharities: ['British Heart Foundation', 'Salvation Army'],
    serviceFocus: 'probate-estate',
    description: 'Specialist probate and downsizing clearance in Henleaze, serving elderly homeowners and executors in this established residential area.',
    localKnowledge: 'Henleaze has a high proportion of elderly homeowners, particularly along Henleaze Road, Eastfield and around the Lake. Probate and downsizing clearances are our most common work here. Many properties are large inter-war detached houses with substantial lofts, garages and garden sheds that have accumulated decades of belongings. Access is generally good with most properties having driveways.',
  },
  {
    name: 'Westbury-on-Trym', slug: 'westbury-on-trym', region: 'North Bristol', regionSlug: 'north-bristol', tier: 1,
    postcodes: ['BS9', 'BS10'], propertyTypes: ['Detached houses', '1930s semis', 'Retirement properties', 'Bungalows'],
    avgPropertyPrice: '£450,000', nearestRecyclingCentre: 'Avonmouth',
    localCharities: ['British Heart Foundation', 'Emmaus Bristol'],
    serviceFocus: 'probate-estate',
    description: 'Experienced clearance team for Westbury-on-Trym, frequently handling probate clearances and downsizing in this mature suburban village.',
    localKnowledge: 'The village centre and surrounding streets like Channells Hill, Westbury Hill and Falcondale Road contain a mix of period cottages and large inter-war houses. We regularly work with Westbury solicitors handling probate. Many properties have large gardens and separate garages that need clearing alongside the main house. The retirement complex at Badminton Road is a frequent downsizing clearance location.',
  },
  {
    name: 'Stoke Bishop', slug: 'stoke-bishop', region: 'North Bristol', regionSlug: 'north-bristol', tier: 1,
    postcodes: ['BS9'], propertyTypes: ['Large detached homes', 'Executive properties', 'Period houses'],
    avgPropertyPrice: '£650,000', nearestRecyclingCentre: 'Avonmouth',
    localCharities: ['SOFA Project', 'British Heart Foundation'],
    serviceFocus: 'probate-estate',
    description: 'Discreet estate and probate clearance in Stoke Bishop, handling large, high-value properties with sensitivity and care.',
    localKnowledge: 'Stoke Bishop contains some of Bristol\'s largest residential properties, particularly around Sneyd Park, Stoke Hill and Mariners Drive. These are often 5-6 bedroom homes with multiple garages, wine cellars and substantial grounds. Probate clearances here require careful item sorting — we frequently flag antiques, artwork and high-value items for professional valuation. Discretion is important to our Stoke Bishop clients.',
  },
  {
    name: 'Bedminster', slug: 'bedminster', region: 'South Bristol', regionSlug: 'south-bristol', tier: 1,
    postcodes: ['BS3'], propertyTypes: ['Victorian terraces', 'Ex-council', 'New-build flats', 'HMOs'],
    avgPropertyPrice: '£300,000', nearestRecyclingCentre: 'Hartcliffe Way',
    localCharities: ['SOFA Project', 'Emmaus Bristol', 'Salvation Army'],
    serviceFocus: 'landlord-tenant',
    description: 'Fast-turnaround clearance in Bedminster, popular with landlords and letting agents needing end-of-tenancy and void property clearance.',
    localKnowledge: 'North Street and East Street anchor this regenerating area, with Victorian terraces running off in tight rows. Parking is challenging on streets like Luckwell Road and British Road — we often arrive early to secure loading space. The mix of long-term residents and new buy-to-let investors means we handle both sensitive family clearances and quick landlord turnarounds. The Bedminster Green development is bringing new apartment blocks to the area.',
  },
  {
    name: 'Southville', slug: 'southville', region: 'South Bristol', regionSlug: 'south-bristol', tier: 1,
    postcodes: ['BS3'], propertyTypes: ['Victorian terraces', 'Converted flats', 'Period cottages'],
    avgPropertyPrice: '£375,000', nearestRecyclingCentre: 'Hartcliffe Way',
    localCharities: ['SOFA Project', 'Emmaus Bristol'],
    serviceFocus: 'mixed',
    description: 'House clearance in Southville — a vibrant community with period terraces and growing demand for eco-conscious clearance services.',
    localKnowledge: 'The colourful terraces of North Street, Stackpool Road and Greville Road define Southville. Properties are typically narrow-fronted Victorian homes with small rear gardens and limited rear access. Our eco-conscious approach resonates strongly here — Southville residents consistently ask about recycling rates and charity donations. The Tobacco Factory and street art scene reflect a community that cares about sustainability.',
  },
  {
    name: 'Knowle', slug: 'knowle', region: 'South Bristol', regionSlug: 'south-bristol', tier: 1,
    postcodes: ['BS4'], propertyTypes: ['1930s semis', 'Ex-council', 'Bungalows', 'Family homes'],
    avgPropertyPrice: '£310,000', nearestRecyclingCentre: 'Hartcliffe Way',
    localCharities: ['British Heart Foundation', 'Salvation Army'],
    serviceFocus: 'family-downsizing',
    description: 'Affordable clearance services in Knowle, regularly helping families with downsizing and property clearance in this established neighbourhood.',
    localKnowledge: 'The 1930s semis along Wells Road and the ex-council estates around Broadwalk and Redcatch Road form the core of our Knowle clearances. Many are family homes where elderly residents are downsizing to retirement properties. Properties typically have good vehicle access with front driveways. The Broadwalk Shopping Centre area generates regular commercial clearance enquiries.',
  },
  {
    name: 'Fishponds', slug: 'fishponds', region: 'East Bristol', regionSlug: 'east-bristol', tier: 1,
    postcodes: ['BS16'], propertyTypes: ['Victorian terraces', 'Ex-council', 'New-build estates', 'HMOs'],
    avgPropertyPrice: '£290,000', nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['Emmaus Bristol', 'Salvation Army'],
    serviceFocus: 'landlord-tenant',
    description: 'Reliable house clearance in Fishponds covering end-of-tenancy, landlord and residential clearance across this busy east Bristol area.',
    localKnowledge: 'Fishponds Road is one of Bristol\'s busiest thoroughfares, lined with shops and Victorian terraces running off it. The student HMO market around UWE generates seasonal demand for end-of-tenancy clearances in June/July. Further from the centre, the Oldbury Court and Lodge Causeway areas have more established family homes. Parking along Fishponds Road itself is difficult, so we coordinate timing with tenants and landlords.',
  },
  {
    name: 'Brislington', slug: 'brislington', region: 'South Bristol', regionSlug: 'south-bristol', tier: 1,
    postcodes: ['BS4'], propertyTypes: ['1930s semis', 'Post-war estates', 'Bungalows'],
    avgPropertyPrice: '£320,000', nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['British Heart Foundation', 'SOFA Project'],
    serviceFocus: 'family-downsizing',
    description: 'House clearance in Brislington, frequently handling downsizing and probate clearances in this popular south-east Bristol suburb.',
    localKnowledge: 'Brislington straddles the A4 Bath Road, with 1930s semis on the hill and post-war estates below. Wick Road, Allison Road and Sandy Park Road are our regular clearance streets. Many bungalows here are home to elderly residents downsizing after decades. The proximity to St Philips Causeway recycling centre means efficient processing of cleared items. Victory Park and the old Brislington Village area have some older, larger properties.',
  },
  {
    name: 'Totterdown', slug: 'totterdown', region: 'South Bristol', regionSlug: 'south-bristol', tier: 1,
    postcodes: ['BS3', 'BS4'], propertyTypes: ['Colourful Victorian terraces', 'Cottages', 'Converted flats'],
    avgPropertyPrice: '£340,000', nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['SOFA Project', 'Emmaus Bristol'],
    serviceFocus: 'mixed',
    description: 'Clearance specialists in Totterdown, navigating the steep streets and terraced properties this iconic neighbourhood is known for.',
    localKnowledge: 'Totterdown\'s famous colourful terraces climb steeply from the Bath Road, making access a genuine challenge. Wells Road, Oxford Street and William Street have some of the steepest residential gradients in Bristol. Vans cannot always park directly outside, so our team carries items further than usual. Many properties have cellars but no rear access. Despite the access challenges, we love clearing Totterdown homes — the Victorian architecture is characterful and the community is close-knit.',
  },
  {
    name: 'Keynsham', slug: 'keynsham', region: 'Bath & Keynsham', regionSlug: 'bath-and-keynsham', tier: 1,
    postcodes: ['BS31'], propertyTypes: ['Detached houses', '1960s estates', 'New-builds', 'Retirement properties'],
    avgPropertyPrice: '£350,000', nearestRecyclingCentre: 'Keynsham Recycling Centre',
    localCharities: ['British Heart Foundation', 'Salvation Army'],
    serviceFocus: 'probate-estate',
    description: 'Professional clearance in Keynsham, serving the B&NES community with probate, downsizing and full house clearance services.',
    localKnowledge: 'Keynsham sits between Bristol and Bath along the A4, with its own distinct High Street and town centre. Clearances here include the 1960s estates around Wellsway and Chandag Road, retirement bungalows near the Memorial Park, and period properties in the town centre. We serve the broader B&NES area from Keynsham, including Saltford and Whitchurch. The local recycling centre on Pixash Lane handles most of our Keynsham disposal.',
  },
  {
    name: 'Portishead', slug: 'portishead', region: 'North Somerset', regionSlug: 'north-somerset', tier: 1,
    postcodes: ['BS20'], propertyTypes: ['Modern developments', 'Marina apartments', 'Family homes', 'Victorian properties'],
    avgPropertyPrice: '£380,000', nearestRecyclingCentre: 'Portishead Recycling Centre',
    localCharities: ['British Heart Foundation'],
    serviceFocus: 'family-downsizing',
    description: 'House clearance in Portishead covering the marina developments, residential estates and older properties in this popular North Somerset town.',
    localKnowledge: 'Portishead has seen massive growth with the marina quarter developments at Port Marine and Harbour Road adding hundreds of modern apartments. We clear both these newer properties and the older residential areas around Nore Road and the High Street. The coastal location means some properties suffer from damp, which affects clearance weight and handling. Portishead\'s distance from central Bristol means we schedule carefully to make the most of each visit.',
  },

  // === TIER 2 (17 areas) ===
  {
    name: 'Cotham', slug: 'cotham', region: 'Central Bristol', regionSlug: 'central-bristol', tier: 2,
    postcodes: ['BS6'], propertyTypes: ['Victorian terraces', 'Student HMOs', 'Converted flats'],
    nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['SOFA Project'], serviceFocus: 'landlord-tenant',
    description: 'End-of-tenancy and landlord clearance in Cotham, with many student and rental properties requiring regular clearance.',
    localKnowledge: 'The student HMOs around Cotham Hill, Cotham Road South and Aberdeen Road need regular end-of-tenancy clearance, particularly in June and September. The larger family homes on Cotham Gardens and Hampton Road generate occasional probate work.',
  },
  {
    name: 'Horfield', slug: 'horfield', region: 'North Bristol', regionSlug: 'north-bristol', tier: 2,
    postcodes: ['BS7'], propertyTypes: ['1930s semis', 'Victorian terraces', 'Ex-council'],
    nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'Affordable house clearance in Horfield, serving families and landlords across this popular north Bristol neighbourhood.',
    localKnowledge: 'The streets around Filton Avenue and Wellington Hill have a mix of 1930s semis and Victorian terraces. Clearances near the Memorial Stadium require match-day parking awareness. Many older residents on Kellaway Avenue and Muller Road are downsizing.',
  },
  {
    name: 'Ashley Down', slug: 'ashley-down', region: 'North Bristol', regionSlug: 'north-bristol', tier: 2,
    postcodes: ['BS7'], propertyTypes: ['Victorian terraces', 'New-builds', 'Converted flats'],
    nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['SOFA Project'], serviceFocus: 'landlord-tenant',
    description: 'House clearance in Ashley Down, covering the mix of period terraces and modern developments near the County Ground.',
    localKnowledge: 'The Victorian terraces near the old County Ground and the newer Boklok developments on Muller Road create a mixed clearance demand. Student lets around Station Road and Dongola Avenue need seasonal end-of-tenancy work.',
  },
  {
    name: 'Montpelier', slug: 'montpelier', region: 'Central Bristol', regionSlug: 'central-bristol', tier: 2,
    postcodes: ['BS6', 'BS2'], propertyTypes: ['Victorian terraces', 'Artist studios', 'HMOs'],
    nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['Emmaus Bristol'], serviceFocus: 'landlord-tenant',
    description: 'Creative and eco-conscious clearance in Montpelier, respecting the area\'s unique character and community spirit.',
    localKnowledge: 'The colourful terraces on Picton Street, Richmond Road and St Andrews Road are tightly packed with limited parking. Many properties are HMOs or artist live/work spaces with unconventional layouts. The area\'s strong community identity means residents care about where their items end up.',
  },
  {
    name: 'Hotwells', slug: 'hotwells', region: 'Central Bristol', regionSlug: 'central-bristol', tier: 2,
    postcodes: ['BS8'], propertyTypes: ['Georgian terraces', 'Warehouse conversions', 'Modern apartments'],
    nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['SOFA Project'], serviceFocus: 'mixed',
    description: 'Specialist clearance in Hotwells, from harbourside flats to period properties along the historic waterfront.',
    localKnowledge: 'The harbourside flats along Hotwell Road and the Georgian terraces of Granby Hill and Ambra Vale present varied access challenges. Warehouse conversions like the old Aardman building area have commercial lifts but narrow corridors. Parking along the harbour is restricted.',
  },
  {
    name: 'Easton', slug: 'easton', region: 'East Bristol', regionSlug: 'east-bristol', tier: 2,
    postcodes: ['BS5'], propertyTypes: ['Victorian terraces', 'HMOs', 'Ex-council'],
    nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['Emmaus Bristol', 'Salvation Army'], serviceFocus: 'landlord-tenant',
    description: 'Fast, affordable clearance in Easton, frequently handling landlord and end-of-tenancy clearances in this diverse community.',
    localKnowledge: 'St Mark\'s Road and Stapleton Road define this diverse neighbourhood. Victorian terraces often have rear access via back lanes, which helps with clearance logistics. The area has a high proportion of rental properties generating regular landlord clearance work.',
  },
  {
    name: 'St George', slug: 'st-george', region: 'East Bristol', regionSlug: 'east-bristol', tier: 2,
    postcodes: ['BS5'], propertyTypes: ['Victorian terraces', '1930s semis', 'Ex-council'],
    nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'Reliable house clearance in St George, covering the terraced streets and family homes of this established east Bristol area.',
    localKnowledge: 'Church Road and Clouds Hill Road sit at the centre of this established area. The Victorian terraces stepping down towards Lawrence Hill and the inter-war semis climbing towards Crew\'s Hole are typical clearance properties. Good bus route access makes scheduling straightforward.',
  },
  {
    name: 'Kingswood', slug: 'kingswood', region: 'East Bristol', regionSlug: 'east-bristol', tier: 2,
    postcodes: ['BS15'], propertyTypes: ['Victorian terraces', '1930s semis', 'Ex-council', 'New-builds'],
    nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['British Heart Foundation', 'Salvation Army'], serviceFocus: 'mixed',
    description: 'Comprehensive clearance services in Kingswood, from High Street shops to the residential streets of this busy east Bristol hub.',
    localKnowledge: 'The High Street area has some commercial clearance demand alongside the residential streets. The terraces along Regent Street and Hanham Road and the estates around Kings Chase are our regular Kingswood work. The South Gloucestershire council boundary runs through here.',
  },
  {
    name: 'Downend', slug: 'downend', region: 'South Gloucestershire', regionSlug: 'south-gloucestershire', tier: 2,
    postcodes: ['BS16'], propertyTypes: ['1960s estates', 'Detached houses', 'Bungalows'],
    nearestRecyclingCentre: 'Mangotsfield Recycling Centre',
    localCharities: ['British Heart Foundation'], serviceFocus: 'family-downsizing',
    description: 'Professional house clearance in Downend, regularly helping with downsizing and estate clearances in this family-friendly suburb.',
    localKnowledge: 'The residential estates around Cleeve Wood Road, Overndale Road and Badminton Road consist mainly of 1960s-70s family homes. Many original residents are now in their 70s-80s, driving consistent probate and downsizing demand. Good vehicle access with wide roads and driveways.',
  },
  {
    name: 'Bradley Stoke', slug: 'bradley-stoke', region: 'South Gloucestershire', regionSlug: 'south-gloucestershire', tier: 2,
    postcodes: ['BS32'], propertyTypes: ['Modern detached', 'New-build estates', 'Executive homes'],
    nearestRecyclingCentre: 'Sort It! Patchway',
    localCharities: ['British Heart Foundation'], serviceFocus: 'family-downsizing',
    description: 'Modern property clearance in Bradley Stoke, including new-build estates and executive homes in South Gloucestershire\'s newest town.',
    localKnowledge: 'One of the UK\'s newest towns, built mainly in the 1990s-2000s. Properties on Baileys Court Road, Brook Way and around the Willow Brook Centre are modern and well-accessed. Clearance demand is mainly from families relocating rather than probate. Garages here often serve as storage units rather than car storage.',
  },
  {
    name: 'Filton', slug: 'filton', region: 'South Gloucestershire', regionSlug: 'south-gloucestershire', tier: 2,
    postcodes: ['BS34'], propertyTypes: ['1930s semis', 'Ex-council', 'New-build apartments'],
    nearestRecyclingCentre: 'Sort It! Patchway',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'House clearance in Filton, serving the mix of traditional homes and new developments near the Airbus and aerospace hub.',
    localKnowledge: 'The mix of 1930s housing near Filton Avenue and new-build apartments around the old Filton Airfield site creates varied clearance needs. Aerospace workers relocating and older residents downsizing are our typical Filton clients. Close to the Sort It! Patchway recycling centre.',
  },
  {
    name: 'Yate', slug: 'yate', region: 'South Gloucestershire', regionSlug: 'south-gloucestershire', tier: 2,
    postcodes: ['BS37'], propertyTypes: ['1960s–70s estates', 'New-builds', 'Detached houses'],
    nearestRecyclingCentre: 'Sort It! Yate',
    localCharities: ['British Heart Foundation'], serviceFocus: 'mixed',
    description: 'Full clearance services in Yate, covering the town\'s residential estates and surrounding villages in South Gloucestershire.',
    localKnowledge: 'The 1960s-70s residential estates around Station Road, Goose Green and Brimsham Park form the core of Yate. The town\'s own Sort It! recycling centre makes disposal efficient. Newer developments at North Yate are bringing younger families, but most clearance demand comes from the original estates.',
  },
  {
    name: 'Thornbury', slug: 'thornbury', region: 'South Gloucestershire', regionSlug: 'south-gloucestershire', tier: 2,
    postcodes: ['BS35'], propertyTypes: ['Period properties', 'Detached houses', 'Bungalows', 'Retirement homes'],
    nearestRecyclingCentre: 'Sort It! Thornbury',
    localCharities: ['British Heart Foundation'], serviceFocus: 'probate-estate',
    description: 'Sensitive probate and downsizing clearance in Thornbury, a market town with many elderly homeowners and period properties.',
    localKnowledge: 'This small market town has a distinct character with period properties along the High Street and Castle Street, and residential estates spreading outward. The older population drives steady probate clearance demand. Properties often have large gardens, outbuildings and garages requiring separate clearance.',
  },
  {
    name: 'Clevedon', slug: 'clevedon', region: 'North Somerset', regionSlug: 'north-somerset', tier: 2,
    postcodes: ['BS21'], propertyTypes: ['Victorian seafront', 'Retirement properties', 'Bungalows'],
    nearestRecyclingCentre: 'Clevedon Recycling Centre',
    localCharities: ['British Heart Foundation'], serviceFocus: 'probate-estate',
    description: 'Compassionate house clearance in Clevedon, frequently handling probate and estate clearances in this seaside town.',
    localKnowledge: 'The Victorian and Edwardian seafront properties along the Hill Road and Marine Parade are characterful but can present access challenges on steep lanes. Retirement homes and bungalows along Old Church Road and Kenn Road generate regular downsizing clearance work. The local recycling centre on Weston Road is nearby.',
  },
  {
    name: 'Nailsea', slug: 'nailsea', region: 'North Somerset', regionSlug: 'north-somerset', tier: 2,
    postcodes: ['BS48'], propertyTypes: ['1960s estates', 'New-builds', 'Detached houses'],
    nearestRecyclingCentre: 'Backwell Recycling Centre',
    localCharities: ['British Heart Foundation'], serviceFocus: 'family-downsizing',
    description: 'Professional clearance in Nailsea, helping families with downsizing and full house clearance across this North Somerset town.',
    localKnowledge: 'Built mainly in the 1960s-70s, Nailsea\'s estates around Silver Street, Brockway and Stock Way North are typical of our clearances here. Young Street and the High Street retain some older properties. The growing retirement community creates steady downsizing demand.',
  },
  {
    name: 'Long Ashton', slug: 'long-ashton', region: 'North Somerset', regionSlug: 'north-somerset', tier: 2,
    postcodes: ['BS41'], propertyTypes: ['Period houses', 'Village cottages', 'Modern estates'],
    nearestRecyclingCentre: 'Hartcliffe Way',
    localCharities: ['SOFA Project'], serviceFocus: 'probate-estate',
    description: 'Discreet house clearance in Long Ashton village, handling period homes and estates with care and sensitivity.',
    localKnowledge: 'This village on Bristol\'s western edge has period cottages along Long Ashton Road and modern estates like the David Wilson development. Properties often have larger gardens than central Bristol. The village feel means discretion is valued — neighbours notice unusual activity.',
  },
  {
    name: 'Bath', slug: 'bath', region: 'Bath & Keynsham', regionSlug: 'bath-and-keynsham', tier: 2,
    postcodes: ['BA1', 'BA2'], propertyTypes: ['Georgian townhouses', 'Listed buildings', 'Victorian terraces', 'Modern apartments'],
    avgPropertyPrice: '£450,000', nearestRecyclingCentre: 'Midland Road Recycling Centre',
    localCharities: ['Julian House', 'Dorothy House', 'British Heart Foundation'],
    serviceFocus: 'probate-estate',
    description: 'Specialist clearance in Bath, experienced with Georgian and listed properties, working alongside Bath solicitors and estate agents.',
    localKnowledge: 'Bath\'s Georgian architecture requires particular care — many properties are Grade I or II listed with restrictions on access and modification. The crescents, terraces and townhouses of Lansdown, Widcombe and Bear Flat often have basement kitchens and multiple floors connected by narrow staircases. We work regularly with Bath solicitors and heritage organisations.',
  },

  // === TIER 3 (20+ areas) ===
  {
    name: 'Emersons Green', slug: 'emersons-green', region: 'South Gloucestershire', regionSlug: 'south-gloucestershire', tier: 3,
    postcodes: ['BS16'], propertyTypes: ['New-build estates', 'Modern detached'],
    nearestRecyclingCentre: 'Mangotsfield Recycling Centre',
    localCharities: ['British Heart Foundation'], serviceFocus: 'family-downsizing',
    description: 'House clearance in Emersons Green, covering the modern developments east of Bristol.',
    localKnowledge: 'Modern estates built since the 1990s around Lyde Green and Emersons Green Town Centre. Properties are well-accessed with driveways and wide roads. Most clearance demand comes from families relocating.',
  },
  {
    name: 'Staple Hill', slug: 'staple-hill', region: 'East Bristol', regionSlug: 'east-bristol', tier: 3,
    postcodes: ['BS16'], propertyTypes: ['Victorian terraces', 'Ex-council'],
    nearestRecyclingCentre: 'Mangotsfield Recycling Centre',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'Affordable clearance in Staple Hill, serving the terraced streets and family homes near the Bristol & Bath Railway Path.',
    localKnowledge: 'Victorian terraces along Broad Street and the surrounding residential roads. The Bristol & Bath Railway Path runs through, making this a connected and accessible area. Affordable housing drives a mix of landlord and family clearances.',
  },
  {
    name: 'Mangotsfield', slug: 'mangotsfield', region: 'East Bristol', regionSlug: 'east-bristol', tier: 3,
    postcodes: ['BS16'], propertyTypes: ['1960s estates', 'Semis', 'Bungalows'],
    nearestRecyclingCentre: 'Mangotsfield Recycling Centre',
    localCharities: ['British Heart Foundation'], serviceFocus: 'family-downsizing',
    description: 'House clearance in Mangotsfield, helping families and executors in this quiet suburban village.',
    localKnowledge: 'A quiet suburb with 1960s housing estates and some older village properties near the church. The Mangotsfield recycling centre is conveniently close. Many elderly residents have lived here for decades, creating regular probate clearance demand.',
  },
  {
    name: 'Hanham', slug: 'hanham', region: 'East Bristol', regionSlug: 'east-bristol', tier: 3,
    postcodes: ['BS15'], propertyTypes: ['Victorian terraces', '1960s estates', 'New-builds'],
    nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'Reliable house clearance in Hanham, covering properties along the River Avon and surrounding residential areas.',
    localKnowledge: 'Situated along the River Avon with properties on Hanham High Street, Memorial Road and the Abbots area. The mix of Victorian workers\' cottages and modern estates creates varied clearance needs. Hanham Court and the village green give the area a semi-rural character.',
  },
  {
    name: 'Warmley', slug: 'warmley', region: 'East Bristol', regionSlug: 'east-bristol', tier: 3,
    postcodes: ['BS30'], propertyTypes: ['1960s–70s estates', 'Semis'],
    nearestRecyclingCentre: 'Mangotsfield Recycling Centre',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'House clearance in Warmley, serving the residential estates of this east Bristol community.',
    localKnowledge: 'Residential estates around Tower Road North and Tower Lane, built mainly in the 1960s-70s. Straightforward vehicle access and proximity to the A4174 ring road. The Warmley Waiting Room heritage site sits nearby.',
  },
  {
    name: 'Winterbourne', slug: 'winterbourne', region: 'South Gloucestershire', regionSlug: 'south-gloucestershire', tier: 3,
    postcodes: ['BS36'], propertyTypes: ['Village properties', 'New-builds', 'Detached houses'],
    nearestRecyclingCentre: 'Sort It! Yate',
    localCharities: ['British Heart Foundation'], serviceFocus: 'mixed',
    description: 'Professional clearance in Winterbourne village and the surrounding Frampton Cotterell area.',
    localKnowledge: 'A village community with properties ranging from period cottages on High Street to modern estates. Frampton Cotterell next door shares the same clearance coverage. Properties often have large gardens and outbuildings typical of semi-rural South Gloucestershire.',
  },
  {
    name: 'Chipping Sodbury', slug: 'chipping-sodbury', region: 'South Gloucestershire', regionSlug: 'south-gloucestershire', tier: 3,
    postcodes: ['BS37'], propertyTypes: ['Period properties', 'Cotswold stone cottages', 'Modern estates'],
    nearestRecyclingCentre: 'Sort It! Yate',
    localCharities: ['British Heart Foundation'], serviceFocus: 'probate-estate',
    description: 'Careful house clearance in Chipping Sodbury, handling the market town\'s characterful period properties.',
    localKnowledge: 'A historic market town with Cotswold stone properties along Broad Street and Horse Street. Period homes require careful handling of potentially valuable items. The surrounding countryside means some properties have substantial outbuildings, barns and garden stores.',
  },
  {
    name: 'Southmead', slug: 'southmead', region: 'North Bristol', regionSlug: 'north-bristol', tier: 3,
    postcodes: ['BS10'], propertyTypes: ['Ex-council', '1930s semis', 'New-builds'],
    nearestRecyclingCentre: 'Avonmouth',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'Affordable house clearance in Southmead, near the major hospital and residential estates.',
    localKnowledge: 'Major housing estates built in the 1930s-50s around Greystoke Avenue and Doncaster Road. Southmead Hospital nearby is a local landmark. Clearance demand is mainly from families and council tenants, with regular council housing void clearances.',
  },
  {
    name: 'Lockleaze', slug: 'lockleaze', region: 'North Bristol', regionSlug: 'north-bristol', tier: 3,
    postcodes: ['BS7'], propertyTypes: ['Ex-council', 'New-builds', '1950s estates'],
    nearestRecyclingCentre: 'St Philips Causeway',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'House clearance in Lockleaze, serving this regenerating north Bristol community.',
    localKnowledge: 'Post-war council estates undergoing regeneration around Gainsborough Square. New housing developments are changing the area\'s character. A mix of long-term residents and new arrivals creates varied clearance needs.',
  },
  {
    name: 'Brentry', slug: 'brentry', region: 'North Bristol', regionSlug: 'north-bristol', tier: 3,
    postcodes: ['BS10'], propertyTypes: ['1960s estates', 'Semis', 'Bungalows'],
    nearestRecyclingCentre: 'Avonmouth',
    localCharities: ['British Heart Foundation'], serviceFocus: 'family-downsizing',
    description: 'House clearance in Brentry, a quiet residential area with many older properties requiring clearance.',
    localKnowledge: 'A quiet 1960s residential area with bungalows and semis along Brentry Lane and Charlton Road. Many original homeowners are now elderly, driving downsizing and probate clearance demand. Good vehicle access with most properties having driveways.',
  },
  {
    name: 'Sea Mills', slug: 'sea-mills', region: 'North Bristol', regionSlug: 'north-bristol', tier: 3,
    postcodes: ['BS9'], propertyTypes: ['1930s garden suburb', 'Detached houses'],
    nearestRecyclingCentre: 'Avonmouth',
    localCharities: ['SOFA Project'], serviceFocus: 'probate-estate',
    description: 'House clearance in Sea Mills, the unique garden suburb with characterful 1930s homes near the Avon Gorge.',
    localKnowledge: 'A unique 1930s garden suburb designed as social housing, with distinctive inter-war architecture along Shirehampton Road and The Crescent. The planned layout means good road access but some properties have narrow side passages. Proximity to the Avon Gorge gives the area a semi-rural feel.',
  },
  {
    name: 'Shirehampton', slug: 'shirehampton', region: 'North Bristol', regionSlug: 'north-bristol', tier: 3,
    postcodes: ['BS11'], propertyTypes: ['1930s semis', 'Ex-council', 'Village properties'],
    nearestRecyclingCentre: 'Avonmouth',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'House clearance in Shirehampton village, close to the Avonmouth recycling centre for efficient disposal.',
    localKnowledge: 'A village community with 1930s semis, ex-council estates and some older properties near the High Street and Park Road. Close proximity to the Avonmouth recycling centre is convenient for disposal. The village atmosphere means we take a discreet approach.',
  },
  {
    name: 'Avonmouth', slug: 'avonmouth', region: 'North Bristol', regionSlug: 'north-bristol', tier: 3,
    postcodes: ['BS11'], propertyTypes: ['Terraces', 'Ex-council'],
    nearestRecyclingCentre: 'Avonmouth',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'Fast clearance in Avonmouth, conveniently located near the main recycling centre.',
    localKnowledge: 'A small residential area surrounded by industrial land and the docks. The terraced houses along Avonmouth Road and the newer housing near the community centre form the main residential area. The Avonmouth recycling centre is literally on the doorstep.',
  },
  {
    name: 'Stockwood', slug: 'stockwood', region: 'South Bristol', regionSlug: 'south-bristol', tier: 3,
    postcodes: ['BS14'], propertyTypes: ['1960s estates', 'Semis', 'Bungalows'],
    nearestRecyclingCentre: 'Hartcliffe Way',
    localCharities: ['British Heart Foundation'], serviceFocus: 'family-downsizing',
    description: 'House clearance in Stockwood, serving families and elderly residents in this south-east Bristol suburb.',
    localKnowledge: 'The 1960s estates around Hollway Road, Sturminster Road and Ladman Road are typical family homes. Many original residents are now elderly. The area is relatively self-contained, sitting between the A37 and open countryside. Good vehicle access throughout.',
  },
  {
    name: 'Bishopsworth', slug: 'bishopsworth', region: 'South Bristol', regionSlug: 'south-bristol', tier: 3,
    postcodes: ['BS13'], propertyTypes: ['Ex-council', '1950s estates', 'Semis'],
    nearestRecyclingCentre: 'Hartcliffe Way',
    localCharities: ['Salvation Army'], serviceFocus: 'mixed',
    description: 'Affordable clearance services in Bishopsworth, near the Hartcliffe Way recycling centre.',
    localKnowledge: 'Residential estates around Bishport Avenue and Church Road, close to the Hartcliffe Way recycling centre. A mix of council and privately owned properties. The proximity to the recycling centre means we can process items very efficiently.',
  },
  {
    name: 'Hartcliffe', slug: 'hartcliffe', region: 'South Bristol', regionSlug: 'south-bristol', tier: 3,
    postcodes: ['BS13'], propertyTypes: ['Ex-council', '1950s estates'],
    nearestRecyclingCentre: 'Hartcliffe Way',
    localCharities: ['Salvation Army'], serviceFocus: 'landlord-tenant',
    description: 'Quick turnaround clearance in Hartcliffe, close to the recycling centre for efficient waste processing.',
    localKnowledge: 'Large post-war housing estate with properties around Bishport Avenue and Hareclive Road. We handle regular void property clearances for housing associations and council housing teams. The Hartcliffe Way recycling centre is adjacent to the area.',
  },
  {
    name: 'Hengrove', slug: 'hengrove', region: 'South Bristol', regionSlug: 'south-bristol', tier: 3,
    postcodes: ['BS14'], propertyTypes: ['1960s estates', 'Ex-council', 'New-builds'],
    nearestRecyclingCentre: 'Hartcliffe Way',
    localCharities: ['British Heart Foundation'], serviceFocus: 'mixed',
    description: 'House clearance in Hengrove, covering the established estates and new Hengrove Park developments.',
    localKnowledge: 'The established 1960s estates around Airport Road and Bamfield sit alongside new developments at Hengrove Park where the old airport site is being transformed. Clearances here tend to be family downsizing or tenant turnover. The nearby Hartcliffe Way recycling centre is convenient.',
  },
  {
    name: 'Whitchurch', slug: 'whitchurch', region: 'South Bristol', regionSlug: 'south-bristol', tier: 3,
    postcodes: ['BS14'], propertyTypes: ['Village properties', 'New-builds', 'Detached houses'],
    nearestRecyclingCentre: 'Hartcliffe Way',
    localCharities: ['British Heart Foundation'], serviceFocus: 'family-downsizing',
    description: 'House clearance in Whitchurch village, on the southern edge of Bristol.',
    localKnowledge: 'A village on Bristol\'s southern edge with older properties along Bristol Road and newer estates. The semi-rural location means some properties have larger gardens and outbuildings than typical Bristol homes. Good A37 access for our vehicles.',
  },
  {
    name: 'Windmill Hill', slug: 'windmill-hill', region: 'South Bristol', regionSlug: 'south-bristol', tier: 3,
    postcodes: ['BS3'], propertyTypes: ['Victorian terraces', 'Converted flats'],
    nearestRecyclingCentre: 'Hartcliffe Way',
    localCharities: ['SOFA Project'], serviceFocus: 'mixed',
    description: 'House clearance on Windmill Hill, serving the Victorian terraces of this popular south Bristol neighbourhood.',
    localKnowledge: 'The Victorian terraces stepping up from St Luke\'s Road toward Wells Road are tightly packed with on-street parking only. Many properties have been converted into flats, creating regular clearance work for landlords. Views over the city but steep streets for carrying heavy items.',
  },
];

export function getAreasByRegion(regionSlug: string): Area[] {
  return areas.filter(a => a.regionSlug === regionSlug);
}

export function getAreasByTier(tier: 1 | 2 | 3): Area[] {
  return areas.filter(a => a.tier === tier);
}

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find(a => a.slug === slug);
}

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find(r => r.slug === slug);
}
