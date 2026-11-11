// Mr MeeSeeks 8.1.17a — reviewed employee identities and historical aliases.
// Names below are confirmed by the site administrator. Extend only with verified mappings.
window.MRM_EMPLOYEES = [
  {email:'adbla@vestas.com', name:'Adam Blake'},
  // Add other verified Vestas email addresses before offering them in the selector.
];
window.MRM_ALIASES = {
  'adbla':'Adam Blake', 'adam blake':'Adam Blake',
  'mtsmh':'Matt Smith', 'matt smith':'Matt Smith',
  'jsuha':'Joshua Hall', 'joshua hal':'Joshua Hall',
  'josh hall':'Joshua Hall', 'joshua hall':'Joshua Hall',
  'luke':'Luke Rayner', 'luke rayner':'Luke Rayner'
};
// Only these administrator-confirmed placeholder names are excluded from people reporting.
window.MRM_TEST_NAMES = ['jim','bob'];
// Normalise casing, whitespace and company email handles for reporting and selection.
window.MRM_RESOLVE_EMPLOYEE = function(value){
  const raw=String(value??'').trim();
  const key=raw.toLowerCase().replace(/\s+/g,' ');
  const handle=key.endsWith('@vestas.com')?key.slice(0,-'@vestas.com'.length):key;
  const employees=window.MRM_EMPLOYEES||[];
  const byEmail=employees.find(e=>String(e.email||'').toLowerCase()===key);
  if(byEmail)return byEmail.name;
  return (window.MRM_ALIASES||{})[key]||(window.MRM_ALIASES||{})[handle]||raw;
};
