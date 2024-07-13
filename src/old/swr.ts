// const fetchCompanies = async (authHeader: string | null) => {
//   return fetchApiData<Company[]>(`/api/companies/all`, {}, authHeader);
// };

// const fetchInstances = async (
//   companyId: number | undefined,
//   authHeader: string | null
// ) => {
//   return fetchApiData<Instance[]>(
//     `/api/instances/${companyId}`,
//     {},
//     authHeader
//   );
// };

// const fetchConnections = async (
//   companyId: number | undefined,
//   authHeader: string | null
// ) => {
//   return fetchApiData<Connection[]>(
//     `/api/connections/${companyId}`,
//     { fields: "systemID" },
//     authHeader
//   );
// };
// const companiesKey = isAuthenticated ? "/api/companies/all" : null;
// const {
//   isLoading: isCompaniesLoading,
//   error: companiesError,
//   data: companiesData,
// } = useSWR<Company[]>(companiesKey, () => fetchCompanies(authHeader), {
//   onSuccess: (data) => setCompanies(data),
// });

// // Always call useSWR but disable the fetch conditionally by passing null as the key when not authenticated or companyID is not available
// // For instances
// const instancesKey =
//   isAuthenticated && selectedCompany?.companyID
//     ? `/instances/${selectedCompany.companyID}`
//     : null;
// const { error: instancesError, isValidating: isInstancesLoading } = useSWR<
//   Instance[]
// >(
//   instancesKey,
//   () => fetchInstances(selectedCompany?.companyID, authHeader),
//   { onSuccess: (data) => setInstances(data), onError: () => setInstances([]) }
// );

// // For connections
// const connectionsKey =
//   isAuthenticated && selectedCompany?.companyID
//     ? `/connections/${selectedCompany.companyID}`
//     : null;
// useSWR<Connection[]>(
//   connectionsKey,
//   () => fetchConnections(selectedCompany?.companyID, authHeader),
//   {
//     onSuccess: (data) => setConnections(data),
//     onError: () => setConnections([]),
//   }
// );
