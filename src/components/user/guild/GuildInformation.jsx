import React from "react";

export const GuildInformation = ({ result }) => {
  console.log(result);
  return <div>{result.guild_master_name}</div>;
};
