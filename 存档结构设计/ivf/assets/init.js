module.exports = (config) => {
    return Promise.resolve((core) => {
        return Promise.all([core.loadPlugins('plugins.bundle.js'), core.loadPlugins('common.plugins.bundle.js')]);
    });
};
