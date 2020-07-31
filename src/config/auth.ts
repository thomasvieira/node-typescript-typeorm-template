let jwtSettings = process.env.JWT_SETTINGS;
if (jwtSettings === undefined) {
  jwtSettings = '{}';
}

const authConfig = JSON.parse(jwtSettings);

export default authConfig;
