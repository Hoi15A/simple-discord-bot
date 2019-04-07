module.exports.help = function (title, description, usage, examples, permission) {
  let helpStr = `
\`\`\`asciidoc
${title}
${'='.repeat(title.length)}
${description}

Usage::
- ${usage}

`
  if (permission !== undefined && permission !== '') {
    helpStr += `Required Permission::\n- '${permission}'\n\n`
  }

  if (examples.length === 0) {
    // do nothing
  } else if (examples.length === 1) {
    helpStr += `Example::\n`
  } else {
    helpStr += `Examples::\n`
  }

  for (let i = 0; i < examples.length; i++) {
    helpStr += `- ${examples[i]}\n`
  }
  helpStr += `\`\`\``

  return helpStr
}
