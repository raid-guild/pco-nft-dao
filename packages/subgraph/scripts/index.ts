import path from 'path';
import fs from 'fs';
import glob from 'glob';
import handlebars from 'handlebars';
import rinkeby from './deployments/rinkeby-deployment.json';
import yargs from 'yargs';

interface HarbergerDeployment {
  networkName: string;
  startBlock: number;

  // Contracts
  harbergerNft: string;
}

const deployment = (network: string): HarbergerDeployment => {
  switch (network) {
    case 'rinkeby': {
      return {
        networkName: rinkeby.networkName,
        startBlock: rinkeby.startBlock,

        // Contracts
        harbergerNft: rinkeby.harbergerNft,
      };
    }
  }
  throw new Error('Unsupported network');
};

yargs
  .command('flatten', 'Flatten the generated code.', () => {
    const generated = path.resolve(__dirname, '..', 'src', 'generated');
    const globbed = glob.sync('**/*', { cwd: path.join(generated), absolute: true });
    const files = globbed.filter(item => {
      const stats = fs.statSync(item);
      return stats.isFile();
    });

    const directories = globbed.filter(item => {
      const stats = fs.statSync(item);
      return stats.isDirectory();
    });

    files.forEach(item => {
      const to = path.join(generated, path.basename(item));
      fs.renameSync(item, to);
    });

    directories.forEach(item => {
      fs.rmSync(item, { recursive: true, force: true });
    });
  })
  .command(
    'template',
    'Creating files from templates, populated via deployment addresses',
    yargs => {
      return yargs.option('network', {
        type: 'string',
        default: 'rinkeby',
      });
    },
    async args => {
      const deploymentInfo = deployment(args.network);
      {
        console.log('GENERATING SUBGRAPH MANIFEST');
        const template = path.join(__dirname, '../templates/subgraph.yml');
        const outputFile = path.join(__dirname, '../subgraph.yaml');
        const content = fs.readFileSync(template, 'utf8');

        const compile = handlebars.compile(content);
        const replaced = compile(deploymentInfo);

        fs.writeFileSync(outputFile, replaced);
      }
    },
  )
  .help().argv;
